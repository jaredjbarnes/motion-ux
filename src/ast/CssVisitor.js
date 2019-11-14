export default class CssVisitor {
  arguments(node) {
    node.children = node.children.filter(child => child.name != "divider");
  }

  method(node){
    node.children = node.children.filter(child => child.name != "spaces");
  }

  values(node){
    node.children = node.children.filter(child => child.name != "spaces");
  }
}
