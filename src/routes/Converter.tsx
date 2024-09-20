import React from 'react';
import "./Converter.css";
import { useEffect, useState } from "react";
import axios from "axios";

export function Converter(/* props */) {


  return (
    <div className="root-container">
      <div className="search-currency">
        <input
          type="text"
          value={100}
          placeholder="Amount"
        />
        <span>{123}</span>
      </div>
      <div className="currencies-container">
        <div className="selectors">
          <select
            name="basecurrency"
            id="basecurrency"
          >
            <option key={1} value={123}>
              {123}
            </option>
          </select>
        </div>
        <div className="selectors">
          <select
            name="targetcurrency"
            id="targetcurrency"
          >
            <option key={321} value={321}>
              {321}
            </option>
            );
          </select>
        </div>
      </div>
    </div>
  );
}
