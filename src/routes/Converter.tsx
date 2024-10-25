import React from 'react';
import "./Converter.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = 'http://localhost:3000/currencies';

export function Converter(/* props */) {
  const [base, setBase] = useState('');
  const [target, setTarget] = useState('');
  const [amount, setAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {

        setCurrencies(Object.entries(data) as any);
      });
  }, []);

  useEffect(() => {
    if (base !== '' && target !== '') {
      fetch(`${API_URL}/base/${base}/target/${target}`)
        .then(res => res.json())
        .then(data => {

          setRate(data.rate);
        });
    }
  }, [base, target]);

  const onChangeSelect = (ev: any) => {
    const { name, value } = ev.target;
    name == 'targetcurrency' ? setTarget(value) : setBase(value)
  }

  return (
    <div className="root-container">
      <div className="search-currency">
        <input
          type="text"
          value={amount}
          placeholder="Amount"
          onChange={({ target }) => setAmount(Number(target.value))}
        />
        <span>
          Conversion result: {
            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rate * amount)
          }
        </span>
      </div>
      <div className="currencies-container">
        <div className="selectors">
          <select
            name="basecurrency"
            id="basecurrency"
            onChange={onChangeSelect}
          >
            {currencies.map(val => {
              const [key, label] = val;

              return <option key={key} value={key}>
                {label}
              </option>
            })}

          </select>
        </div>
        <div className="selectors">
          <select
            name="targetcurrency"
            id="targetcurrency"
            onChange={onChangeSelect}
          >
            {currencies.map(val => {
              const [key, label] = val;
              return <option key={key} value={key}>
                {label}
              </option>
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
