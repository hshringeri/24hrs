import fs from 'fs'
import path from 'path'

export const setWantDoEvents = (req, res) => {
    const wantDoEvents = req.body
    console.log(wantDoEvents)
    
    const dirPath = path.resolve('./events');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    const newContent = `\nWant to do Events\nAll these events happen after 5 pm only\n${wantDoEvents}`;

    fs.writeFileSync(path.join(dirPath, 'wantToDoEvents.txt'), newContent);

    res.send(wantDoEvents);
}