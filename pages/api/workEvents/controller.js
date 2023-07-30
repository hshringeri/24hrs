import fs from 'fs'
import path from 'path'

export const setWorkEvents = (req, res) => {
    const workEvents = req.body
    console.log(workEvents)
    console.log("boy")
    
    const dirPath = path.resolve('./events');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    const newContent = `\nWork Events\nAdd these events from 9 am - 5 pm only\n${workEvents}`;

    fs.writeFileSync(path.join(dirPath, 'workEvents.txt'), newContent);

    res.send(workEvents)
}