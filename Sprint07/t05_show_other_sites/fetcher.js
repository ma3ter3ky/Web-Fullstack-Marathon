const axios = require('axios');

async function fetchBodyFromURL(url) {
    const response = await axios.get(url);
    const html = response.data;

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) return '[No <body> tag found]';

    return escapeHTML(bodyMatch[1]);
}

function escapeHTML(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

module.exports = { fetchBodyFromURL };
