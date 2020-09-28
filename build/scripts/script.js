
//TODO: http://prgssr.ru/development/tehniki-raboty-s-dom-roditelskie-dochernie-i-sosednie-elementy.html#heading-section
// https://learn.javascript.ru/event-delegation
// https://tproger.ru/translations/dom-javascript/
(function () {
  let button = document.querySelectorAll(".availabel__write-button");
  let blocks = document.querySelectorAll(".blocks");

  for (let j = 0; j < blocks.length; j++) {
    for (let i = 0; i < button.length; i++) {
      button[i].onclick = function () {
        blocks[i].classList.toggle("hidden");
      };
    }
  }
})();


(function () {
  let parent = document.querySelector('.editor__files')
  let buttondelete = document.querySelectorAll(".editor__delete-button");
  let formdelete = document.querySelectorAll(".editor__form-block");

  for (let j = 0; j < formdelete.length; j++) {
    for (let i = 0; i < buttondelete.length; i++) {
      buttondelete[i].onclick = function () {
        console.log(buttondelete[i].innerHTML);
        buttondelete[i].style.color = 'red';
        formdelete[i].parentNode.removeChild(formdelete[i]);
      }
    }
  }
})();



(function () {
  let textarea = document.querySelectorAll(".textarea-input");

  for (let i = 0; i < textarea.length; i++) {
    textarea[i].addEventListener("keyup", function () {
      if (this.scrollTop > 0) {
        this.style.height = this.scrollHeight + "px";
      }
    });
  }
})();

(function () {
  let titlehidden = document.querySelector('.editor__title');
  let blockform = document.querySelectorAll('.delete-form');
  let buttoneditor = document.querySelectorAll('.editor__rewrite-button');

  for (let j = 0; j < blockform.length; j++) {
    for (let i = 0; i < buttoneditor.length; i++) {
      buttoneditor[i].onclick = function () {
        blockform[i].classList.toggle('delete');
        if (!blockform[i].classList.contains('delete')) {
          titlehidden.classList.remove('delete')
        } else {
          titlehidden.classList.add('delete')
        }
      }
    }
  };
})();




//buttoneditor.onclick = function () {
//  console.log('fsfdsfsddsfdsf')
//  blockform.classList.toggle('delete');
//  titlehidden.classList.toggle('delete');
//}


//TODO: взял с сайта, отправку формы на сервер можно delete

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  const inputFile = document.querySelectorAll(".upload-file__input");

  /////////// Кнопка «Прикрепить файл» ///////////
  inputFile.forEach(function (el) {
    let textSelector = document.querySelector(".upload-file__text");
    let fileList;

    // Событие выбора файла(ов)
    el.addEventListener("change", function (e) {
      // создаём массив файлов
      fileList = [];
      for (let i = 0; i < el.files.length; i++) {
        fileList.push(el.files[i]);
      }

      // вызов функции для каждого файла
      fileList.forEach((file) => {
        uploadFile(file);
      });
    });

    // Проверяем размер файлов и выводим название
    const uploadFile = (file) => {
      // файла <5 Мб
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл должен быть не более 5 МБ.");
        return;
      }

      // Показ загружаемых файлов
      if (file && file.length > 1) {
        if (file.length <= 4) {
          textSelector.textContent = `Выбрано ${file.length} файла`;
        }
        if (file.length > 4) {
          textSelector.textContent = `Выбрано ${file.length} файлов`;
        }
      } else {
        textSelector.textContent = file.name;
      }
    };
  });

  // Отправка формы на сервер
  const postData = async (url, fData) => {
    // имеет асинхронные операции

    // начало отправки
    // здесь можно оповестить пользователя о начале отправки

    // ждём ответ, только тогда наш код пойдёт дальше
    let fetchResponse = await fetch(url, {
      method: "POST",
      body: fData,
    });

    // ждём окончания операции
    return await fetchResponse.text();
  };

  if (forms) {
    forms.forEach((el) => {
      el.addEventListener("submit", function (e) {
        e.preventDefault();

        // создание объекта FormData
        let fData = new FormData();

        // Добавление всех input, кроме type="file"
        el.querySelectorAll('input:not([type="file"])').forEach((input) => {
          fData.append(input.name, input.value);
        });

        // Добавление файлов input type file
        let file = el.querySelector(".upload-file__input");
        for (let i = 0; i < file.files.length; i++) {
          fData.append("files[]", file.files[i]); // добавляем файлы в объект FormData()
        }

        // Отправка на сервер
        postData("./mail.php", fData)
          .then((fetchResponse) => {
            console.log("Данные успешно отправлены!");
            console.log(fetchResponse);
          })
          .catch(function (error) {
            console.log("Ошибка!");
            console.log(error);
          });
      });
    });
  }
});
