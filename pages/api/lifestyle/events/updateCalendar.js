const { OpenAI } = require("langchain");

//import { TextLoader } from "langchain/document_loaders/fs/text";
const TextLoader = require("langchain/document_loaders/fs/text").TextLoader;
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI
const HNSWLib = require("langchain/vectorstores/hnswlib").HNSWLib
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain

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
        events.forEach(event => {
            const eventName = event.event;
            const eventDuration = event.probable_duration;
            const daysPerWeek = event.days_per_week;
            
            event_string +=  eventName + " " +  daysPerWeek + " day(s) per week for" + eventDuration + " per day.\n"

        })

        const res = await chain.call({
            query:  "Add these events to the given calendar. When scheduling on a weekday, only give timeslots after 5 pm." +
             "List out the each event strictly like this: event - timeslot (like this example: go shopping - 2023-08-18T14:00:00-07:00 to 2023-08-18T16:00:00-07:00). No other text is needed. \n" + event_string
           
        })
        console.log(res.text)
        return res.text
    } catch (err) {
        console.error(err);
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
