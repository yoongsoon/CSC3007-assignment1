// source url
url = "https://api.data.gov.sg/v1/environment/psi";

//array for keywords
const array_name = ["national", "central", "west", "east", "north" , "south"];

// fetch request
fetch(url)
    .then(result => result.json())
    .then((output) => {

        //store readings 
        let readings = output["items"][0]["readings"]

        //initialize body and create table
        const body = document.body, tbl = document.createElement('table');
        
        //Timestamp of fetch request
        var currentdate = new Date(); 
        var datetime = "Last Updated: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + ", "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();

        var tag = document.createElement("p");
        var text = document.createTextNode(datetime);
        tag.appendChild(text);
        body.appendChild(tag);
    
        //Table header
        const thead  =  document.createElement('thead');
        tbl.append(thead);

        //Append header cells
        thead.appendChild(document.createElement("th")).
        appendChild(document.createTextNode("Metric"));
        
        for (const name of array_name){
            //convert first letter to uppercase
            const nameWithUpperCase = name.charAt(0).toUpperCase() + name.slice(1)
    
            thead.appendChild(document.createElement("th")).
            appendChild(document.createTextNode(nameWithUpperCase));
        }

        // iterate through the readings
        for (const [key, value] of Object.entries(readings)) {
            
            // create new table row
            const tr = tbl.insertRow();

            //append table cells         
            tr.insertCell().appendChild(document.createTextNode(key));
            for (const name of array_name){
                tr.insertCell().appendChild(document.createTextNode( value[name]));
            }
        }

        body.appendChild(tbl);
        
}).catch(err => console.error(err));