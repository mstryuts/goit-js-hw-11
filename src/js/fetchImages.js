import axios from "axios";

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '29488809-58b059500460d672a67371786';


// export async function fetchImages(query, page) {
//   try {
//       return await axios.get(BASE_URL, {
//           params: {
//               key: API_KEY,
//               query,
//               image_type: 'photo',
//               orientation: 'horizontal',
//               safesearch: true,
//               per_page: 40,
//               page,
//         }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function fetchImages(query, page) {
  try {
    return await axios.get(`https://pixabay.com/api/?key=29488809-58b059500460d672a67371786&q=${query}&image_type=photo&orientation=horizontal&safesearch=false&page=${page}&per_page=40`);

  } catch (error) {
    console.error(error);
  }
}