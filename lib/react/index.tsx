import { useEffect, useRef } from "react";
import { AF, obj } from "../index";
import { AO } from "../index";

export const useDebounce = (fn: AF, deps: any[], ms: number = 50) => {
  const timeOutKeyRef = useRef<any>();

  useEffect(() => {
    timeOutKeyRef.current && clearTimeout(timeOutKeyRef.current);
    timeOutKeyRef.current = setTimeout(fn, ms);
  }, deps);
};



export interface ComposeComponentProps<
  Props = { __children__?: AF;[x: string]: any }
> {
  __children__?(props: Props): any;
}

/**
 * 组件组合
 * 例子：composeComponent(最终渲染组件, ..., 入口组件)
 */
export const composeComponent = <Props extends AO = any>(...Cs) => {
  /**
   * 这里不用reduceRight 是因为这里是用的是包装，从内到外。 (historyTable(queryTable(table)))
   */
  const Base: any = Cs.shift();

  const render = Cs.reduce(
    (__chldren__, C) => (props: AO) => {
      return <C { ...props } __children__ = { __chldren__ } />;
    },
    (props) => <Base { ...props } />
  );

  return (props: Props = obj) => render(props);
};

export const Tab = (f: (props: AO) => any) => (props) => {
  f(props);
  return composeChildrenRender(props);
};

export const composeChildrenRender = <T extends Object = AO>({
  __children__,
  ...props
}: ComposeComponentProps & T) => {
  if (typeof __children__ !== "function")
    throw new Error("__children__必须为函数");
  return __children__(props);
};
