import express, { Request, Response } from "express";
import { runSafely } from "./routes-helper";
import Candidate from "../models/User";
import { errorRes, successRes } from "../resources/util";
import Information from "../models/Information";

const router = express.Router()
router.use(express.json())

router.post("/auth", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { candidateID: req.body.candidateID, password: req.body.password };
        console.log(req.body, query);
        if (await Candidate.exists(query)) {
            successRes(res, { code: "AUTH_SUCCESS" });
        } else {
            errorRes(res, { code: "CANDIDATE_NOT_FOUND" });
        }
    });
});

router.post("/get-details", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { candidateID: req.body.candidateID, password: req.body.password };
        if (await Candidate.exists(query)) {
            const candidate = await Candidate.findOne(query);
            successRes(res, { code: "DETAILS_SHARED", data: candidate });
        } else {
            errorRes(res, { code: "CANDIDATE_NOT_FOUND" });
        }
    });
});

router.post("/agree", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { candidateID: req.body.candidateID, password: req.body.password };
        if (await Candidate.exists(query)) {
            const candidate = await Candidate.findOne(query);
            candidate!.step = 2;
            await candidate?.save();
            successRes(res, { code: "STEP_UPDATED", });
        } else {
            errorRes(res, { code: "CANDIDATE_NOT_FOUND" });
        }
    });
});

router.post("/personality-step-complete", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { candidateID: req.body.candidateID, password: req.body.password };
        console.log(query)
        if (await Candidate.exists(query)) {

            const information = new Information({
                candidateID: req.body.candidateID,
                responseJSON: req.body.responseJSON,
                informationType: "PERSONALITY-TEST",
            });
            await information.save()

            const candidate = await Candidate.findOne(query);
            candidate!.step = 3;
            await candidate?.save();
            successRes(res, { code: "STEP_UPDATED", });
        } else {
            errorRes(res, { code: "CANDIDATE_NOT_FOUND" });
        }
    });
});

router.post("/communication-step-complete", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { candidateID: req.body.candidateID, password: req.body.password };
        if (await Candidate.exists(query)) {

            const information = new Information({
                candidateID: req.body.candidateID,
                responseJSON: req.body.responseJSON,
                informationType: "COMMUNICATION-TEST",
            });
            await information.save()

            const candidate = await Candidate.findOne(query);
            candidate!.step = 4;
            await candidate?.save();
            successRes(res, { code: "STEP_UPDATED", });
        } else {
            errorRes(res, { code: "CANDIDATE_NOT_FOUND" });
        }
    });
});

router.post("/get-max", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { candidateID: req.body.candidateID, password: req.body.password };
        if (await Candidate.exists(query)) {
            const candidates = await Candidate.find().sort({ usersOnBoarded: -1 }).limit(1);
            successRes(res, { code: "STEP_UPDATED", data: candidates[0].usersOnBoarded });
        } else {
            errorRes(res, { code: "CANDIDATE_NOT_FOUND" });
        }
    });
});

export default router;