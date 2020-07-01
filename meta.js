module.exports = {
  helpers: {
    raw: function (options) {
      return options.fn(this);
    },
  },
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name",
    },
    description: {
      type: "string",
      required: false,
      message: "Project description",
      default: "a vue ssr application",
    },
    author: {
      type: "string",
      message: "Author",
    },
  },
  // filters: {
  //   "store/*": "vuex",
  // },
  completeMessage:
    "{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}",
};
