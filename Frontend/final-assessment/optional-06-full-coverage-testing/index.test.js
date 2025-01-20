import assert from "node:assert";
import { test } from "node:test";
import sum from "./index.js"; // sesuaikan dengan path ke file sum.js

test("Fungsi sum", () => {
  // Cek jika a atau b bukan angka
  assert.equal(sum("a", 5), 0, "Input harus berupa angka");
  assert.equal(sum(5, "b"), 0, "Input harus berupa angka");
  assert.equal(sum("a", "b"), 0, "Input harus berupa angka");

  // Cek jika a atau b negatif
  assert.equal(sum(-1, 5), 0, "Input tidak boleh negatif");
  assert.equal(sum(5, -1), 0, "Input tidak boleh negatif");
  assert.equal(sum(-1, -1), 0, "Input tidak boleh negatif");

  // Cek hasil penjumlahan jika kedua input valid
  assert.equal(sum(2, 3), 5, "Harus mengembalikan 5");
  assert.equal(sum(0, 0), 0, "Harus mengembalikan 0");
  assert.equal(sum(10, 15), 25, "Harus mengembalikan 25");
});
