/// <reference types="react" />
import { RouteProps, DefaultParams } from 'wouter';
interface IRoute extends RouteProps<DefaultParams> {
}
declare const Route: (props: IRoute) => JSX.Element;
export default Route;
