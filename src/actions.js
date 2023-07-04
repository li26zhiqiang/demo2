/* eslint-disable prettier/prettier */
function opetion() {}

class Action {
    actions = {
        onGlobalStateChange: opetion,
        setGlobalState: opetion
    };

    setAction(actions) {
        this.actions = actions;
    }

    // 更新全局state，只有初始化存在的字段才能更新
    setGlobalState(...args) {
        this.actions?.setGlobalState(...args);
    }

    // 监听state变化
    onGlobalStateChange(...args) {
        this.actions?.onGlobalStateChange(...args);
    }
}

const action = new Action();

export default action;
