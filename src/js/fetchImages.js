import axios from "axios";



export function fetchImages(query, page) {
    return axios.get(`https://pixabay.com/api/?key=29488809-58b059500460d672a67371786&q=${query}&image_type=photo&orientation=horizontal&safesearch=false&page=${page}&per_page=40`)
}