const form = document.getElementById('quiz-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    submitAnswer(selectedAnswer);
});

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data)
    }).then(res => res.text());
}

function submitAnswer(selectedAnswer) {
    console.log('Selected answer:', selectedAnswer);
    postData('/', { answer: selectedAnswer }).then(result => {
        document.getElementById('result').textContent = result;
    });

}
