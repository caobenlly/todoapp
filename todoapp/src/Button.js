import React, { useState, useEffect } from "react";

export default function Button() {
  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    setDarkMode(darkMode, true);
    if (darkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);

  // Xử lý toggle chế độ sáng/tối
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Theo dõi mục nào đang được chỉnh sửa
  const [tempValue, setTempValue] = useState(""); // Giá trị tạm thời khi chỉnh sửa

  const handleAddToList = () => {
    if (inputValue.trim() !== "") {
      setList([...list, { content: inputValue.trim(), status: false }]);
      setInputValue("");
    }
  };

  const removeToList = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const submit = (index) => {
    setList(
      list.map((item, i) => (i === index ? { ...item, status:!item.status } : item))
    );
   
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddToList();
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempValue(list[index].content); // Lưu giá trị hiện tại vào tempValue
  };

  // Lưu nội dung sau khi chỉnh sửa
  const handleSave = (index) => {
    setList(
      list.map(
        (item, i) => (i === index ? { ...item, content: tempValue } : item) // Cập nhật nội dung cho mục đang chỉnh sửa
      )
    );
    setEditingIndex(null); // Thoát chế độ chỉnh sửa
  };

  return (
    <div>
      <h1>
        ✅<span style={{ color: darkMode ? "white" : "black" }}>Todoist</span>
      </h1>
      {/* Ô input */}
      <input
        type="text"
        placeholder="What's up ? ..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />

      <button onClick={handleAddToList} style={{ marginLeft: "10px" }}>
        +
      </button>

      {/* Danh sách */}
      <div
        style={{
          marginTop: "40px",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {list.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 15px",
              fontSize: "16px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              maxWidth: "300px",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              outline: "none",
              textDecoration: item.status ? "line-through" : "none", //
            }}
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => handleSave(index)} // Lưu khi click ra ngoài
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSave(index); // Lưu khi nhấn Enter
                }}
                style={{
                  flex: 1,
                  padding: "5px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                autoFocus // Tự động focus vào ô input khi chuyển chế độ chỉnh sửa
              />
            ) : (
              // Chế độ xem
              <span
                onClick={() => handleEdit(index)} // Chuyển sang chế độ chỉnh sửa
                style={{
                  flex: 1,
                  fontSize: "16px",
                  cursor: "pointer",
                  textDecoration: item.status ? "line-through" : "none", // Gạch ngang nếu đã hoàn thành
                }}
              >
                {item.content}
              </span>
            )}
            <div
              style={{
                display: "flex",
                gap: "5px",
                width: "30%",
                justifyContent: "flex-end",
              }}
            >
              {/* SVG 1 */}
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => submit(index)}
              >
                <svg
                  viewBox="0 0 14 14"
                  focusable="false"
                  className="chakra-icon"
                  aria-hidden="true"
                  style={{
                    width: "16px",
                    height: "16px",
                    fill: "currentColor",
                  }}
                >
                  <g fill="currentColor">
                    <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
                  </g>
                </svg>
              </button>
              {/* SVG 2 */}
              <button
                onClick={() => removeToList(index)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="chakra-icon"
                  aria-hidden="true"
                  style={{
                    width: "16px",
                    height: "16px",
                    fill: "currentColor",
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={toggleDarkMode}
        style={{
          padding: "10px 20px",
          backgroundColor: darkMode ? "#ffffff" : "#121212",
          color: darkMode ? "#121212" : "#ffffff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
      >
        {darkMode === true ? (
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            aria-hidden="true"
            focusable="false"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
          </svg>
        ) : (
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            aria-hidden="true"
            focusable="false"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
