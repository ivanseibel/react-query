import React, { ChangeEvent } from 'react';

import './styles.css';

interface FooterProps {
  handleFirstPage: () => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleLastPage: () => void;
  limit: number;
  handleLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Footer: React.FC<FooterProps> = ({
  handleFirstPage,
  handleNextPage,
  handlePreviousPage,
  handleLastPage,
  limit,
  handleLimit
}) => {
  return (
    <footer>
      <div id="page-buttons">
        <button onClick={handleFirstPage}>
          {`|<`}
        </button>
        <button onClick={handlePreviousPage} >
          {`<`}
        </button>
        <button onClick={handleNextPage}>
          {`>`}
        </button>
        <button onClick={handleLastPage}>
          {`>|`}
        </button>
      </div>
      <div id="limit">
        <label htmlFor="limit">limit:
          <select name="limit" id="limit-items" onChange={handleLimit} value={limit} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
      </div>
    </footer>
  );
}
