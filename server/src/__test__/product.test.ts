import supertest from "supertest";
import { createServer } from "../utils/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

describe("Product", () => {
  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("get product route", () => {
    describe("when the product does not exist", () => {
      it("should return the NOT_FOUND status", async () => {
        const productId = "product-id";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("when the product exists", () => {
      it("should return 200 status and the product", async () => {
        // @ts-ignore
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          // @ts-ignore
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);

        // @ts-ignore
        expect(body.productId).toBe(product.productId);
      });
    });
  });

  describe("create product route", () => {
    describe("when the user is not logged in", () => {
      it("should return the UNAUTHORIZED(403) status", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/products")
          .send(productPayload);

        expect(statusCode).toBe(403);
      });
    });
    describe("when the user is logged in", () => {
      it("should return the CREATED(201) status and the product", async () => {
        const jwt = signJwt(userPayload);
        const { body, statusCode } = await supertest(app)
          .post("/api/products")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);
        expect(statusCode).toBe(201);
        expect(body.productId).toBeDefined;
      });
    });
  });
});
