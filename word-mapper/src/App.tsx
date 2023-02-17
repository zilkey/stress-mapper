import React, { useState } from 'react';
import _daDum from './da-dums.json'
const daDum = _daDum as Record<string, string>;

type Phrase = {
  phrase: string;
  tokens: string[];
  stresses: string;
}

function App() {
  const [text, setText] = useState("");
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const parse = () => {
    const phrases = text
      .replaceAll("‘", "'")
      .replaceAll("’", "'")
      .replaceAll("“", "\"")
      .replaceAll("”", "\"")
      .split(/[\n\.,!?]/)
      .filter(s => s.trim());
    setPhrases(phrases.map(phrase => {
      const tokens = phrase.split(/\s/).filter(s => s.trim());
      const words = tokens.map(word => daDum[word.toUpperCase().trim()] || "unknown")
      return {
        phrase,
        tokens,
        stresses: words.join(" ")
      }
    }));
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col">
          <div className="mb-4">
            <textarea rows={20} value={text} onChange={e => setText(e.target.value)} className="form-control"></textarea>
          </div>
          <div className="mb-4">
            <button className="btn btn-primary" onClick={parse}>da DUM</button>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Phrase</th>
                  <th>Stresses</th>
                </tr>
              </thead>
              <tbody>
                {
                  phrases.map((phrase, i) => <tr key={i}>
                    <td>{phrase.phrase}</td>
                    <td>{phrase.stresses}</td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
