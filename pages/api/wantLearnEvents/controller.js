import fs from 'fs'
import path from 'path'
const axios = require('axios')

export const setWantLearnEvents = async (req, res) => {
    const wantLearnEvents = req.body

    console.log("EEWERWERFWERWE")
    console.log(wantLearnEvents)

    const prompt = wantLearnEvents + '\n For each listed activity give 3 ways you can learn the skill, sport etc(books, podcasts, movies, or activities). Give a time allocation for each activity . List out the events like: event: time allocation'
    
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