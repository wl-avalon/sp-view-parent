//定义各种请求的uri PS:暂时先放在一个文件好了，以后多了再分
const GET_ONE_RANDOM_QUESTION = "/study-palace/question-ui/query/getRandomQuestionByCondition"; //根据条件获取随机的一个问题

const LOGIN = "/study-palace/passport/commit/login";    //登陆
const REGISTER = "/study-palace/passport/commit/register"; //注册
const GET_STUDENT_OF_CLASS = "/study-palace/school-admin/query/getStudentOfClass"//获取班级学生列表
const BIND_CHILD_TO_PARENT = "/study-palace/school-admin/commit/bindChildToParent"//绑定学生家长
const GET_CHILD_LIST = "/study-palace/school-admin/query/getChildList"//获取儿女列表

module.exports = {
  LOGIN: LOGIN,
  REGISTER: REGISTER,
  GET_STUDENT_OF_CLASS: GET_STUDENT_OF_CLASS,
  BIND_CHILD_TO_PARENT: BIND_CHILD_TO_PARENT,
  GET_CHILD_LIST: GET_CHILD_LIST,
}
