import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>Tilewar</h1>
      <p>Temiz React Projesi</p>
      <button onClick={() => setCount(count + 1)}>
        Tıkla: {count}
      </button>
    </div>
  )
}

export default App
