import fs from 'fs'
import path from 'path'
const axios = require('axios')

export const setWantLearnEvents = async (req, res) => {
    const wantLearnEvents = req.body

    console.log("EEWERWERFWERWE")
    console.log(wantLearnEvents)

    const prompt = wantLearnEvents + '\n For each provided topic, please recommend a medium relevant to that subject. If I want to learn a technical skill recommend a book or multiple videos. For each topic suggest 3 hours worth of suggestions. If a book takes three hours, only suggest the book. Note that I am based in the Bay Area for activity recommendations. For each suggestion, format it as: event: time allocation.'
    
    console.log(process.env.OPENAI_API_KEY)
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