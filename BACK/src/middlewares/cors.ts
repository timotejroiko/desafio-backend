import * as Cors from "cors";

// validação simplificada de dominio origem para efeitos de CORS
export const cors = Cors({
	origin: (o, cb) => {
		const test = o?.split("://")[1].startsWith(process.env.HOSTNAME || "localhost");
		if(test) {
			cb(null, o);
		} else {
			cb(null, true);
		}
	}
});
