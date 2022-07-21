module.exports = writeJSON;

function writeJSON(fileName,json) {
    try {
        fs.writeFile(fileName, JSON.stringify(json, null, 4), function(err){

            console.log(`Check your project directory for the ${fileName} file`);
    
        });
    } catch (error) {
        console.error(error);
    }

}