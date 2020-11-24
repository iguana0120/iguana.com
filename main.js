'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '人間がゴリラに勝てるのはどれ？', c: ['ボール投げ', '噛む力', '握力']},
    {q: 'アンパンマンの中身はどれ？', c: ['つぶあん', 'こしあん', '肉']},
    {q: '人間とバナナのＤＮＡは何％一致する？', c: ['50%', '25%', '5%']},
  ]);
  let currentNum = 0;
  let isAnswerd;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswerd) {
      return;
    }
    isAnswerd = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswerd = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  // console.log(quizSet[currentNum].c);
  shuffledChoices.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click', () => {
      checkAnswer(li);
    });
    choices.appendChild(li);
  });

  if (currentNum === quizSet.length - 1) {
    btn.textContent = '得点を見る';
  }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `得点: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}