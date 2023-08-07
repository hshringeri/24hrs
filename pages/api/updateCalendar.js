const { OpenAI } = require("langchain");

//import { TextLoader } from "langchain/document_loaders/fs/text";
const TextLoader = require("langchain/document_loaders/fs/text").TextLoader;
const DirectoryLoader = require("langchain/document_loaders/fs/directory").DirectoryLoader;
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI
const HNSWLib = require("langchain/vectorstores/hnswlib").HNSWLib
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings
const RecursiveCharacterTextSpliiter = require("langchain/text_splitter").RecursiveCharacterTextSplitter
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain

const fs = require('fs');
const path = require('path');
const directory = '/Users/hardh/projects/lifestyle-ai/events';


console.log("hi")
const embeddings = new OpenAIEmbeddings({
    openAIApiKey: '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'
})

const combineFiles = new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) reject(err);
    
      let combinedData = '';
    
      files.forEach(file => {
          if(path.extname(file) === '.txt') { // Only read text files
              const data = fs.readFileSync(path.join(directory, file), 'utf-8');
              combinedData += data + '\n';
          }
      });
    
      fs.writeFile('/Users/hardh/projects/lifestyle-ai/pages/api/combined.txt', combinedData, (err) => {
        if (err) reject(err);
        console.log('All files have been combined into one.');
        resolve();
      });
    });
  });

async function loadDocuments() {

    try {
        await combineFiles;
        const loader = new TextLoader("/Users/hardh/projects/lifestyle-ai/pages/api/combined.txt")
        const docs = await loader.load();
        console.log(docs);

        console.log(embeddings)
        const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
        console.log('------')
    
        console.log(vectorStore)
        
        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            
        });
    
    
        const chain = RetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(), 
        );
    
        console.log(chain)
    
        const res = await chain.call({
            query:  "Priority of events. Work Events > Need Events > Want To Learn Events > Want to Do Events \n" +
            "For each event, insert the event into an available time slot in the Current Calendar It can be any day, any free slot of time. Each event should take an hour, unless otherwise stated. For every event list it like: event - time slot" +
            "time slot should be in this format: 2023-07-25T09:00:00-07:00 to 2023-07-25T09:30:00-07:00. Format it EXACTLY how the currentCalendar.txt is" +
            "if event is already in current calendar, please don't add" + 
            "allow for 8 hours of sleep at night from 11PM - 7AM"
           
        })
    
        console.log(res.text)
    } catch (err) {
        console.error(err);
    }


    
   




}

loadDocuments();
