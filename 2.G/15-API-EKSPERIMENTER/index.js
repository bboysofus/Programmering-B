let api_key = 'oEsQXmzt3zrD4llvaOUdIq003KAF60Xs'

fetch('http://api.giphy.com/v1/gifs/trending?api_key=' + api_key + '&limit=20&rating=pg-13')
    .then(response => response.json())
        .then(json => {
            console.log(json.data[0].images.fixed_height.url)
            json.data.map( image => insertImage( image.images.fixed_height.url ))
        })

const insertImage = (url) => {
    let img = document.createElement('img')
    img.src = url
    document.querySelector('body').append(img)
}