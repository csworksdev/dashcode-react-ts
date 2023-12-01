import { useSelector, useDispatch } from "react-redux";
import { handleRute } from "@/redux/rute";

type PayloadTypes = { payload: any; type: "rute/handleRute"; }

const useRute = (): [any, (val: any) => void] => {
	let datas = useSelector((state: any) => state.rute.rute)
	if (datas != null) {
		datas = datas.map((datum: any) => {
			return datum.link
		});
	}

	const dispatch = useDispatch();
	const Rute: any = datas;
	const setRute = (val: any): PayloadTypes => dispatch(handleRute(val));

	return [Rute, setRute];
};

export default useRute;