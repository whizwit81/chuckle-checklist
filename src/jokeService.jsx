export const newJokeAdded = (newJokeInput)=> {

const newJoke = {
    "text": newJokeInput,
    "told": false
}


    const postOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newJoke)
    }

    const response = fetch("http://localhost:8088/jokes", postOptions)
}

export const getAllJokes = () => {
    return fetch ("http://localhost:8088/jokes").then((response) => response.json())
}

export const editJoke = async (existingJoke)=> {
        existingJoke.told = !existingJoke.told
        const postOptions = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(existingJoke)
        }
    
        const response = fetch(`http://localhost:8088/jokes/${existingJoke.id}`, postOptions)
    }

    
export const deleteJoke = async ( deletingJoke) => {

        const portOptions={
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch(`http://localhost:8088/jokes/${deletingJoke.id}`, postOptions)
}