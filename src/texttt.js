() => {
    


            if (im.width >= im.height) {
              return (
                <div
                  className="imgs"
                  style={{
                    display: "grid",
                    gridTemplateColumns: " 1fr 1fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <div
                    className="imcon"
                    style={{ width: "100%", gridColumn: "1 / 4" }}
                  >
                    <img
                      style={{ width: "100%" }}
                      src={prop.img[0]}
                      alt="story"
                    />
                  </div>
                  <div className="imcon" style={{}}>
                    <img
                      style={{ ...imgpos()[1] }}
                      className="__4"
                      src={prop.img[1]}
                      alt="story"
                    />
                  </div>
                  <div className="imcon" style={{}}>
                    <img
                      style={{ ...imgpos()[2] }}
                      className="__4"
                      src={prop.img[2]}
                      alt="story"
                    />
                  </div>
                  <div className="imcon" style={{}}>
                    <img
                      style={{ ...imgpos()[3] }}
                      src={prop.img[3]}
                      alt="story"
                    />
                  </div>
                </div>
              );
            }
            if (im.width <= im.height) {
              return (
                <div
                  className="imgs"
                  style={{
                    display: "grid",
                    gridTemplateColumns: " 1fr 1fr",
                    gridTemplateRows: "1fr  1fr 1fr",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <div
                    className="imcon"
                    style={{ width: "100%", gridRow: "1 / 4" }}
                  >
                    <img
                      style={{ height: "100%" }}
                      src={prop.img[0]}
                      alt="story"
                    />
                  </div>
                  <div
                    className="imcon"
                    style={{ width: `${500 / 3}px`, height: `${500 / 3}px` }}
                  >
                    <img
                      style={{ ...imgpos()[1] }}
                      src={prop.img[1]}
                      alt="story"
                    />
                  </div>
                  <div
                    className="imcon"
                    style={{ width: `${500 / 3}px`, height: `${500 / 3}px` }}
                  >
                    <img
                      style={{ ...imgpos()[2] }}
                      src={prop.img[2]}
                      alt="story"
                    />
                  </div>
                  <div
                    className="imcon"
                    style={{ width: `${500 / 3}px`, height: `${500 / 3}px` }}
                  >
                    <img
                      style={{ ...imgpos()[3] }}
                      src={prop.img[3]}
                      alt="story"
                    />
                  </div>
                </div>
              );
            }
                
















}