import "./History.css"
import { useAppState } from "./AppContext";



function History() {

  const {
    clearHistory,
    history,
  } = useAppState();

  const onClick = () => {
    if (typeof clearHistory === 'function') {
      clearHistory();
    }
  };

  return (
    <>
      <div className="history-header">
        <h2>
          History <span>(<a href="javascript:void" onClick={onClick}>
            Clear
          </a>)</span>
        </h2>

      </div>
      <div className="history-container">
        {(Array.isArray(history) && history.length) ?
          <ul>
            {(history || []).map((item: string) => {
              return (<li>
                {item}
              </li>);
            })}
          </ul> : <div>No items in history yet.</div>
        }
      </div>
    </>
  );

}

export default History;
