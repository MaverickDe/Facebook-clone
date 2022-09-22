

      <div
        style={{
          position: "absolute",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",

          height: "fit-content",
          boxSizing: "border-box",
        }}
        onMouseDown={(e) => {
          move = [e.nativeEvent.offsetX,e.nativeEvent.offsetY]
          // movesticker(e);
          document.querySelector(".stickerzoom").style.display = "flex";
        }}
        onMouseMove={movesticker}
        onMouseUp={(e) => {
          move = false;
          let doc = e.currentTarget;

          setTimeout(() => {
            if (!zoom_ && !move) {
              console.log(move);
              if (!zoom_ && !move) {
                console.log(move);
                document.querySelector(".stickerzoom").style.display = "none";
                setsticker({
                  ...sticker,
                  position: [doc.style.left, doc.style.top],
                  fontsize: doc.style.fontSize,
                });
              }
              document.querySelector(".stickerzoom").style.display = "none";
            }
          }, 3000);
        }}
        onTouchMove={movesticker}
        onTouchEnd={(e) => {
          move = false;
          let doc = e.currentTarget;
          setTimeout(() => {
            if (!zoom_ && !move) {
              console.log("vvv");
              document.querySelector(".stickerzoom").style.display = "none";
              setsticker({
                ...sticker,
                position: [doc.style.left, doc.style.top],
                fontsize: doc.style.fontSize,
              });
            }
          }, 3000);
        }}
        onTouchStart={(e) => {
          document.querySelector(".stickerzoom").style.display = "flex";
          move = true;
        }}
        className="sticker"
      >
        <div
          className="stickerzoom"
          style={{
            display: "none",
            backgroundColor: "blue",
            width: "10px",
            height: "100px",
            marginBottom: "auto",
          }}
        >
          <div
            onMouseLeave={(e) => {
              zoom_ = false;
              let doc = e.currentTarget;
              setTimeout((e) => {
                if (!zoom_ && !move) {
                  document.querySelector(".stickerzoom").style.display = "none";
                  setsticker({
                    ...sticker,
                    position: [doc.style.left, doc.style.top],
                    fontsize: doc.style.fontSize,
                  });
                }
              }, 3000);
            }}
            onTouchEnd={(e) => {
              zoom_ = false;
              let doc = e.currentTarget;
              setTimeout((e) => {
                if (!zoom_ && !move) {
                  document.querySelector(".stickerzoom").style.display = "none";
                  setsticker({
                    ...sticker,
                    position: [doc.style.left, doc.style.top],
                    fontsize: doc.style.fontSize,
                  });
                }
              }, 3000);
            }}
            onMouseMove={(e) => {
              zoom(e, stickerref);
            }}
            onTouchMove={(e) => {
              zoom(e, stickerref);
            }}
            onMouseOver={() => {
              zoom_ = true;
            }}
            onTouchStart={() => {
              zoom_ = true;
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <div
              style={{ marginBottom: "auto", backgroundColor: "red" }}
              className="bar"
            ></div>
          </div>
        </div>
        <p
          ref={stickerref}
          style={{
            fontSize: "100px",

            padding: "0px",
            margin: "0px",
          }}
        >
          {sticker.sticker}
        </p>
      </div>

      <div
        style={{
          position: "absolute",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",

          height: "fit-content",
          boxSizing: "border-box",
        }}
        onMouseDown={(e) => {
          move = true;
          // movesticker(e);
          document.querySelector(".textzoom").style.display = "flex";
        }}
        onMouseMove={movesticker}
        onMouseUp={(e) => {
          move = false;
          let doc = e.currentTarget;

          setTimeout(() => {
            if (!zoom_ && !move) {
              console.log(move);
              if (!zoom_ && !move) {
                console.log(move);
                document.querySelector(".textzoom").style.display = "none";
                setinput({
                  ...input,
                  position: [doc.style.left, doc.style.top],
                  fontsize: doc.style.fontSize,
                });
              }
              document.querySelector(".textzoom").style.display = "none";
            }
          }, 3000);
        }}
        onTouchMove={movesticker}
        onTouchEnd={(e) => {
          move = false;
          let doc = e.currentTarget;
          setTimeout(() => {
            if (!zoom_ && !move) {
              console.log("vvv");
              document.querySelector(".textzoom").style.display = "none";
              setinput({
                ...input,
                position: [doc.style.left, doc.style.top],
                fontsize: doc.style.fontSize,
              });
            }
          }, 3000);
        }}
        onTouchStart={(e) => {
          document.querySelector(".textzoom").style.display = "flex";
          move = true;
        }}
        className="text"
      >
        <div
          className="textzoom"
          style={{
            display: "none",
            backgroundColor: "blue",
            width: "10px",
            height: "100px",
            marginBottom: "auto",
          }}
        >
          <div
            onMouseLeave={(e) => {
              zoom_ = false;
              let doc = e.currentTarget;
              setTimeout((e) => {
                if (!zoom_ && !move) {
                  document.querySelector(".textzoom").style.display = "none";
                  setinput({
                    ...input,
                    position: [doc.style.left, doc.style.top],
                    fontsize: doc.style.fontSize,
                  });
                }
              }, 3000);
            }}
            onTouchEnd={(e) => {
              zoom_ = false;
              let doc = e.currentTarget;
              setTimeout((e) => {
                if (!zoom_ && !move) {
                  document.querySelector(".textzoom").style.display = "none";
                  setinput({
                    ...input,
                    position: [doc.style.left, doc.style.top],
                    fontsize: doc.style.fontSize,
                  });
                }
              }, 3000);
            }}
            onMouseMove={(e) => {
                let this_ = inputref.current;
                console.log(this_.scrollWidth);
                this_.style.width = `${this_.scrollHeight}px`;
                this_.style.height = `${this_.scrollHeight}px`;

              zoom(e, inputref);
            }}
            onTouchMove={(e) => {
                let this_ = inputref.current;
                console.log(this_.scrollWidth);
                this_.style.width = `${this_.scrollHeight}px`;
                this_.style.height = `${this_.scrollHeight}px`;
              zoom(e, inputref);
            }}
            onMouseOver={() => {
              zoom_ = true;
            }}
            onTouchStart={() => {
              zoom_ = true;
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <div
              style={{ marginBottom: "auto", backgroundColor: "red" }}
              className="bar"
            ></div>
          </div>
        </div>
      

        <textarea
          ref={inputref}
          className="input"
          onChange={changeinp}
         
          onInput={(e) => {
            console.log(e, "input");
          }}
          style={{
            fontSize: "50px",
            border: "none",
            outline: "none",
            padding: "0px",
            width: "100%",
           
            // maxWidth:"300px",
            height: "10px",
            width: "10px",
            // backgroundColor:"none",
            background: "transparent",
            // overflowX:"scroll",

            margin: "0px",
            boxSizing: "border-box",
          }}
          value={input.input}
        ></textarea>
      </div>