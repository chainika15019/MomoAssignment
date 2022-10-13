import React,{useEffect,useState} from 'react'

function App(){

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("/content").then(
            response => response.json()
        ).then(
            data => setBackendData(data)
        )
    },[])

    return(
        <div id="rootchild">
            {(typeof backendData === "undefined") ? (
                <p>Loadingggggg</p>
            ) : (
                backendData.map( contentData => (
                   
                        <div id="child">
                            <img src={contentData.contentUrl} alt="scraped image" id="childimg" ></img>
                        </div>


                ))
            )}
        </div>
    )
}

export default App