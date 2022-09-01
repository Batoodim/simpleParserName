const axios = require('axios').default;
const cheerio = require('cheerio');

const fs = require("fs");

const parse = async () => {
    const getHTML = async (url) => {
        const {data} = await axios.get(url);
        return cheerio.load(data);
    }

    for(let i = 1; i <= 2; i++ ){
        const selector = await getHTML(`http://hdrezka.co/films/page/${i}/`);
        selector('.b-content__inline_item').each((i,element) => {
            const nameFilm = selector(element).find('.b-content__inline_item-link a').text();
            const infoFilm = selector(element).find(' .b-content__inline_item-link div').text();
            const linkFilm = selector(element).find('.b-content__inline_item-link a').attr('href');

            fs.appendFileSync('./dataFilms.txt', `${nameFilm} ${infoFilm}; ${linkFilm}\n`);
        });
    }
}
parse();