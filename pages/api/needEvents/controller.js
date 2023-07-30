import fs from 'fs'
import path from 'path'

export const setNeedEvents = (req, res) => {
    const needEvents = req.body
    console.log(needEvents)
    
    const dirPath = path.resolve('./events');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    const newContent = `\nNeed Events\nAll these events happen after 5 pm only\n${needEvents}`;

    fs.writeFileSync(path.join(dirPath, 'needEvents.txt'), newContent);

    res.send(needEvents);
}