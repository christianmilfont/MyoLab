"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Play, Filter, Search } from "lucide-react"

import { machines } from "@/lib/exercises/machines"
import { muscleGroups } from "@/lib/exercises/filters"
import type { Machine } from "@/lib/exercises/types"

export default function MaquinasPage() {

  const [search, setSearch] = useState("")
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)

  const filtered = machines.filter((m) => {

    if (search && !m.name.toLowerCase().includes(search.toLowerCase()))
      return false

    if (selectedMuscle && !m.muscles.includes(selectedMuscle))
      return false

    return true
  })

  const sorted = [...filtered].sort(
    (a, b) => b.hypertrophyScore - a.hypertrophyScore
  )

  function clearFilters() {
    setSelectedMuscle(null)
    setSearch("")
  }

  return (

    <div className="py-16 section-container">

      {/* BUSCA */}

      <div className="flex gap-4 mb-8">

        <div className="relative flex-1">

          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Buscar máquina..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 py-3 rounded-xl border border-border bg-card"
          />

        </div>

        <button
          onClick={() => setFilterOpen(true)}
          className="px-4 py-3 rounded-xl bg-primary text-white flex gap-2"
        >
          <Filter size={18} />
          Filtros
        </button>

      </div>

      {/* CARDS */}

      <div className="space-y-8">

        {sorted.map((machine, index) => (

          <motion.div
            key={machine.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid md:grid-cols-[70%_30%] rounded-3xl overflow-hidden border bg-card"
          >

            {/* IMAGEM */}

            <div className="relative h-[320px]">

              <img
                src={machine.image}
                className="absolute inset-0 w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-lg text-xs text-white">
                Hypertrophy Index {machine.hypertrophyScore}
              </div>

              <div className="absolute bottom-6 left-6 text-white">

                <h3 className="text-2xl font-bold">
                  {machine.name}
                </h3>

              </div>

            </div>

            {/* INFO */}

            <div className="p-8 flex flex-col justify-between">

              <div>

                <p className="text-sm text-muted-foreground mb-4">
                  {machine.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">

                  {machine.muscles.map((m) => (
                    <Badge key={m}>{m}</Badge>
                  ))}

                </div>

                <div>

                  <p className="text-xs mb-2">
                    Hypertrophy Index
                  </p>

                  <div className="w-full bg-secondary h-2 rounded-full">

                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${machine.hypertrophyScore}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

              <button
                onClick={() => setSelectedMachine(machine)}
                className="flex items-center gap-2 mt-6 px-4 py-2 rounded-lg bg-secondary"
              >

                <Play size={16} />
                View Exercise

              </button>

            </div>

          </motion.div>

        ))}

      </div>

      {/* MODAL FILTROS */}

      {filterOpen && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-card p-8 rounded-xl w-[500px]">

            <h2 className="text-xl font-bold mb-6">
              Filtrar por músculo
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">

              {muscleGroups.map((m) => (

                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className={`px-3 py-1 rounded-lg border ${
                    selectedMuscle === m
                      ? "bg-primary text-white"
                      : "bg-secondary"
                  }`}
                >
                  {m}
                </button>

              ))}

            </div>

            <div className="flex justify-between">

              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg border"
              >
                Limpar
              </button>

              <button
                onClick={() => setFilterOpen(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Aplicar
              </button>

            </div>

          </div>

        </div>

      )}

      {/* MODAL EXERCICIO */}

      {selectedMachine && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-card p-8 rounded-2xl w-[700px]">

            <h2 className="text-xl font-bold mb-4">
              {selectedMachine.name}
            </h2>

            <div className="aspect-video mb-6">

              <iframe
                className="w-full h-full rounded-x1"
                src={selectedMachine.video}
                allowFullScreen
              />

            </div>

            <div className="mb-6">

              <h3 className="font-semibold mb-2">
                Muscle Activation
              </h3>

              <div className="flex flex-wrap gap-2">

                {selectedMachine.activation.map((m) => (
                  <Badge key={m}>{m}</Badge>
                ))}

              </div>

            </div>

            <div className="flex justify-end">

              <button
                onClick={() => setSelectedMachine(null)}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Fechar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )
}