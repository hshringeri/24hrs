import fs from 'fs'
import path from 'path'
const axios = require('axios')

export const setWantLearnEvents = async (req, res) => {
    const wantLearnEvents = req.body

    console.log("EEWERWERFWERWE")
    console.log(wantLearnEvents)

    const prompt = wantLearnEvents + '\n For each numbered topic in the list suggest a book to read, podcast to listen to, and video to watch. ' +
    'return results in this format for every topic (read/listen/watch) this (book/podcast/video) for each suggestion, one item per line. Dont add any other text but that. Dont add text like: Learn topic' + 
    'if there are 3 items in the list, have book, podcast and video for each item. If three items, 9 mediums of learning should be suggested.'
    

    const wantLearnEventsExpanded = await axios.post('https://api.openai.com/v1/completions', {  
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 800,
    
        }, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            
            }
        })

    console.log(wantLearnEventsExpanded.data.choices[0].text)

    const wantToLearnEvents = wantLearnEventsExpanded.data.choices[0].text
    
    const dirPath = path.resolve('./events');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    const newContent = `\n Want to Learn Events\nAll these events happen after 5 pm only\n${wantToLearnEvents}`;

    fs.writeFileSync(path.join(dirPath, 'wantToLearnEvents.txt'), newContent);

    
    res.send(wantToLearnEvents);
}