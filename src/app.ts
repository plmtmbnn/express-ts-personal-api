import cors from "cors";
import express, {
	type Application,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import routes from "./routes"; // Make sure this exports an Express Router

const app: Application = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes (ensure routes is a Router)
app.use("/api", routes);

// ✅ Root health endpoint
app.get(["/", "/health", "/ping"], (req: Request, res: Response) => {
	res.status(200).json({
		status: "up",
		timestamp: new Date().toISOString(),
		details: {
			method: req.method,
			path: req.originalUrl,

			ip_address: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
			user_agent: req.headers["user-agent"],
		},
	});
});

// ✅ 404 Fallback
app.use((req: Request, res: Response) => {
	res.status(404).json({
		error: "Route not found",
		path: req.originalUrl,
	});
});

// ✅ Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error("[Express Error]", err);
	res.status(500).json({
		error: "Internal Server Error",
		message: err?.message || "Unexpected error occurred",
	});
});

export default app; // ✅ Default export now
