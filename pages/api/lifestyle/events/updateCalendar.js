const { OpenAI } = require("langchain");
const { Configuration, OpenAIApi } = require("openai");

//import { TextLoader } from "langchain/document_loaders/fs/text";
const TextLoader = require("langchain/document_loaders/fs/text").TextLoader;
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI
const HNSWLib = require("langchain/vectorstores/hnswlib").HNSWLib
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
})


export async function loadDocuments(events) {
    try {
        const loader = new TextLoader("/Users/hardh/projects/lifestyle-ai/events/currentCalendar.txt")
        const docs = await loader.load();;

        console.log(embeddings)
        const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
        
        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            
        });
    
    
        const chain = RetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(), 
        );
    
        console.log(chain)
        
        let event_string = ""
        console.log("Events: " + events)
        events.forEach(event => {
            const eventName = event.event;
            const eventDuration = event.probable_duration;
            const daysPerWeek = event.days_per_week;
            
            event_string +=  eventName + " for "  + eventDuration + ". Schedule it " + daysPerWeek + " time per week.\n"

        })

        const res = await chain.call({
            query:  "Add these events to the given calendar by finding available time slots. Make sure no events overlap." +
             "List out the each event strictly like this: event - timeslot (like this example: go shopping - 2023-08-18T14:00:00-07:00 to 2023-08-18T16:00:00-07:00). If it is multiple events with same name, list each event out multiple times with different time slots. Don't add anything else. \n" + event_string
           
        })
        console.log(res.text)
        const formattedSchedule = await formatFunction(res.text)
        console.log(formattedSchedule)
        return formattedSchedule
        
    } catch (err) {
        console.error(err);
    }
}

async function formatFunction(updatedSchedule) {
    try {
        console.log("DFDASF")
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": updatedSchedule}],
            functions: [ {
                name: 'formatFunction',
                description: 'formats updated schedule ',
                parameters: {
                    type: 'object',
                    properties: {
                        formattedSchedule: {
                            type: "string",
                            description: "Convert each new timeslot in the content (the ) into the format: Event Name - Date - Start Time (e.g., 9:30:00) - End Time (e.g., 15:30). For each slot, match the event name, extract its start and end times, and ensure uniformity in presentation"
                        }
                    }
                }
            }],
            function_call: "auto"
        })

        try {
            const completionResponse = completion.data.choices[0].message.function_call.arguments;
            console.log("did u make it here 3")

            const event = JSON.parse(completionResponse)
            console.log(event)
            const formattedSchedule = event.formattedSchedule
            console.log(formattedSchedule)
            
            return formattedSchedule
        } catch(error) {
            return Error(error)
        }
        
    } catch(error) {
        return Error(error)

    }
}
// const events = [
//     {
//       event: 'go to gym',
//       probable_duration: '1 hour',
//       days_per_week: '3'
//     }
//   ]
  
// loadDocuments(events);
