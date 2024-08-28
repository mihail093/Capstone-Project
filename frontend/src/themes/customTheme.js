const customTheme = {
  dropdown: {
    floating: {
      target: "!bg-myGreen mt-2 text-myBeige focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 focus:shadow-outline",
      base: "z-10 w-fit rounded-lg !border-2 !border-green-800 !bg-myGreen shadow",
      header: "px-4 py-2 text-myBeige",
      item: {
        container: "hover:bg-blue-50 group",
        base: "text-myBeige px-2 group-hover:text-black"
      }
    }
  },
  textInput: {
    field: {
      input: {
        colors: {
          gray: "border-gray-500 bg-blue-100 text-gray-900 focus:border-green-800 focus:ring-green-800"
        }
      }
    }
  },
  textarea: {
    colors: {
      gray: "border-gray-500 bg-blue-50 text-gray-900 focus:border-green-800 focus:ring-green-800"
    }
  },
  button: {
    color: {
      primary: "bg-myGreen text-myBeige hover:!bg-myLightGreen",
      failure: "bg-myRed text-myBeige hover:!bg-myLightRed",
      light: "bg-myRed text-myBeige hover:bg-myLightRed border-2 border-red-600 shadow-xl shadow-red-600/40 hover:border-red-900 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-200"
    }
  },
  checkbox: {
    "root": {
      "base": "h-4 w-4 rounded border border-gray-500 bg-blue-50 focus:ring-2",
      "color": {
        "default": "text-myGreen focus:ring-green-800"
      }
    }
  },
  radio: {
    "root": {
      "base": "h-4 w-4 border border-black text-myGreen focus:ring-2 focus:ring-myGreen"
    }
  }
  
}

export default customTheme;