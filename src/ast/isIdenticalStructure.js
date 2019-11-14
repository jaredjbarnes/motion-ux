const isIdenticalStructure = (nodeA, nodeB) => {
  if (nodeA == null || nodeB == null) {
    return false;
  }

  if (nodeA.name !== nodeB.name) {
    return false;
  }

  if (Array.isArray(nodeA.children) && !Array.isArray(nodeA.children)) {
    return false;
  }

  if (Array.isArray(nodeA.children) && Array.isArray(nodeA.children)) {
    return nodeA.children.every((child, index) =>
      isIdenticalStructure(child, nodeB.children[index])
    );
  }

  return true;
};

export default isIdenticalStructure;
