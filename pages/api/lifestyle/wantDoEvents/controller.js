import fs from 'fs'
import path from 'path'
const axios = require('axios')

export const setWantDoEvents = async (req, res) => {
    const wantDoEvents = req.body
    console.log(wantDoEvents)

    const prompt = wantDoEvents + '\n Figure out how much time in a day it takes to these events. Return just like this: event: time. No other text'

    console.log(process.env.OPENAI_API_KEY)
    const wantDoEventsExpanded = await axios.post('https://api.openai.com/v1/completions', {  
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 800,
    
        }, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            
            }
        })

    console.log(wantDoEventsExpanded.data.choices[0].text)

    const wantToDoEvents = wantDoEventsExpanded.data.choices[0].text
    
    const dirPath = path.resolve('./events');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    const newContent = `\nWant to do Events\nAll these events happen after 5 pm only\n${wantToDoEvents}`;

    fs.writeFileSync(path.join(dirPath, 'wantToDoEvents.txt'), newContent);

    res.send(wantToDoEvents);
}