export const pwaStatusCheck = () => {
  const addHomeBtnClick = (event) => {
    event.userChoice.then((choiceResult) => {
      console.log(`clicked ${choiceResult}`);
    });

    window.removeEventListener(
      "beforeinstallprompt",
      addHomeBtnClick
    );
  };

  window.addEventListener("beforeinstallprompt", addHomeBtnClick);

  window.addEventListener("appinstalled", (event) => {
    console.log("installed");
  });
}
