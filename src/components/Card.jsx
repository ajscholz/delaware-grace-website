import React from "react"

const Card = ({ card }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "8px",
        backgroundImage: `url(${card.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 5,
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <h3>{card.title}</h3>
      </div>
    </div>
  )
}

export default Card
