class AjaxTools{
    static GetRequest = async(url)=>{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseJson = await response.json();
        return responseJson;
    }
    static PostRequest = async(url, data = {})=>{
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseJson = await response.json();
        return responseJson;
    }
    static PutRequest = async(url, data = {})=>{
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseJson = await response.json();
        return responseJson;
    }
}
export {AjaxTools}

class Render {
    static Create = (Node) =>{
        try{
            if (typeof Node === "undefined" || Node == null){
                return document.createTextNode("Nodo null o indefinido.");
            } else if (typeof Node === "string" || typeof Node === "number") {
                return Node;
            } else {
                Node.tagName = Node.tagName ?? "div";
                const element = document.createElement(Node.tagName);
                for(const prop in Node) {
                    if(prop == "tagName") { continue; }
                    else if (prop == "class") {element.className = Node[prop]; }
                    else if (prop == "children" && Node.children.__proto__ == Array.prototype) {
                        Node.children.forEach(Child => {
                            element.appendChild(Render.Create(Child));
                        });
                    }
                    else element[prop] = Node[prop];
                }
                return element;
            }
        } catch (error){
            console.log(error, Node);
            return document.createTextNode("Problemas en la construccion del nodo.");
        }
    }
}
export {Render}

function pad (number){
    if (number < 10){
        return '0' + number;
    }
    return number;
}
Date.prototype.toISO = function(){
    return this.getUTCFullYear()+
    '-' + pad(this.getUTCMonth() + 1) +
    '-' + pad(this.getUTCDate())
};