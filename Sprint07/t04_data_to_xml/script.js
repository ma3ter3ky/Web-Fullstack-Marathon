const beforeData = [
    {
        author: 'Tony Stark',
        quote: "Sometimes you gotta run before you can walk.",
        photo: ['images/ironman.jpg'],
        comments: ['Classic Stark', 'Still iconic']
    },
    {
        author: 'Steve Rogers',
        quote: "I can do this all day.",
        photo: ['images/captain.jpg'],
        comments: ['Legendary', 'Go Cap!']
    },
    {
        author: 'Thor',
        quote: "Bring me Thanos!",
        photo: ['images/thor.jpg'],
        comments: ['Goosebumps', 'His finest moment']
    },
    {
        author: 'Natasha Romanoff',
        quote: "I've got red in my ledger. I'd like to wipe it out.",
        photo: ['images/blackwidow.jpg'],
        comments: ['Emotional', 'Powerful line']
    }
];

const afterData = JSON.parse(JSON.stringify(beforeData));

function renderQuotes(quotes, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = quotes.map(q => `
    <div class="quote">
      <h3>${q.author}</h3>
      <p><strong>"${q.quote}"</strong></p>
      <div>
        ${q.photo.map(p => `<img src="${p}" alt="Photo">`).join('')}
      </div>
      <ul>
        ${q.comments.map(c => `<li>${c}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

renderQuotes(beforeData, 'before');
renderQuotes(afterData, 'after');
