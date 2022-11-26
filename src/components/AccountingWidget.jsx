import React, { useRef, useState } from "react";

import AcountingList from "./AcountingList";

import isDate from "./utils/isDate";

export default function AcountingWidget() {
  const [form, setForm] = useState({
    date: "",
    passed: "",
  });

  const currentError = useRef();

  const [list, setList] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isDate(form.date)) {
      currentError.current.textContent = "Не корректная дата";
      return;
    } else {
      currentError.current.textContent = "";
    }

    if (typeof +form.passed != "number") {
      currentError.current.textContent = "Пройденный путь должен быть числом";
      return;
    } else {
      currentError.current.textContent = "";
    }

    const currentDateIndex = list.findIndex((el) => el.date === form.date);

    if (currentDateIndex !== -1) {
      let newEl = list[currentDateIndex];
      newEl = { date: newEl.date, passed: +newEl.passed + +form.passed };

      let newArr = [...list];
      newArr.splice(currentDateIndex, 1, newEl);
      setList(newArr);
    } else {
      const prevDate = list.findIndex((el) => {
        let prevDateArr = el.date.split(".");
        let currentDateArr = form.date.split(".");
        if (
          new Date(prevDateArr[2], prevDateArr[1] - 1, prevDateArr[0]) <
          new Date(currentDateArr[2], currentDateArr[1] - 1, currentDateArr[0])
        ) {
          return true;
        }
        return false;
      });

      if (prevDate !== -1) {
        const newArr = [...list];
        newArr.splice(prevDate, 0, form);
        setList(newArr);
      } else {
        setList((prevList) => [...prevList, form]);
      }
    }

    setForm({
      date: "",
      passed: "",
    });
  }

  function inputChange(event) {
    const name = event.target.name;

    setForm((prevForm) => ({ ...prevForm, [name]: event.target.value }));
  }

  function removeListItem(date) {
    setList((prevList) => [...prevList.filter((obj) => obj.date !== date)]);
  }

  function handleEditItem(el) {
    setList((prevList) => [...prevList.filter((obj) => obj !== el)]);

    form.date = el.date;
    form.passed = el.passed;
  }

  return (
    <div className="workout">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label className="form-label" htmlFor="date">
            Дата(ДД.ММ.ГГГГ)
          </label>
          <input
            className="form-input"
            id="date"
            type="text"
            name="date"
            value={form.date}
            onChange={inputChange}
          />
        </div>
        <div className="input-box">
          <label className="form-label" htmlFor="passed">
            Пройдено км
          </label>
          <input
            className="form-input"
            id="passed"
            type="text"
            name="passed"
            value={form.passed}
            onChange={inputChange}
          />
        </div>
        <button className="button">OK</button>
        <div ref={currentError} className="input-error"></div>
      </form>
      <AcountingList
        list={list}
        onEditItem={handleEditItem}
        onRemoveItem={removeListItem}
      />
    </div>
  );
}
