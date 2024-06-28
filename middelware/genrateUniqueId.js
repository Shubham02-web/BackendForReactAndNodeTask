const generateUniqueUserId = async (name) => {
  const { customAlphabet } = await import("nanoid");
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const generateId = customAlphabet(alphabet, 5);
  const uniqueId = `${name}_${generateId()}`;
  return uniqueId;
};

module.exports = generateUniqueUserId;
