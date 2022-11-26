import React from "react";

export default function AcountingFormList({ list, onRemoveItem, onEditItem }) {
  if (!list.length) return null;

  return (
    <div className="workout-body">
      <div className="workout-header">
        <div className="workout-header-item">Дата(ДД.ММ.ГГ)</div>
        <div className="workout-header-item">Пройдено км</div>
        <div className="workout-header-item">Действия</div>
      </div>
      <ul className="workout-list">
        {list.map((el, i) => (
          <li className="workout-list-item" key={el.date}>
            <div className="workout-list-item-date">{el.date}</div>
            <div className="workout-list-item-passed">{el.passed}</div>
            <div className="workout-list-item-actions">
              <span
                className="material-symbols-outlined workout-list-item-edit"
                onClick={() => onEditItem(el)}
              >
                edit
              </span>
              <span
                className="workout-list-item-delete"
                onClick={() => onRemoveItem(el.date)}
              >
                &#10006;
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
