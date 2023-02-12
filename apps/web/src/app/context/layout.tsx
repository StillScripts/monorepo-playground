import { fetchCategories } from "#/utils/getCategories"
import { Boundary } from "ui"
import { CounterProvider } from "./CounterContext"
import React from "react"
import ContextClickCounter from "./ContextClickCounter"
import { TabWrapper } from "#/components/TabWrapper"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await fetchCategories()

  const tabs = [
    {
      text: "Home",
      slug: "/",
    },
    ...categories.map((x) => ({
      text: x.name,
      slug: x.slug,
    })),
  ]

  const path = "/context"

  return (
    <div className="p-12">
      <Boundary
        labels={["Server Component Boundary"]}
        size="small"
        animateRerendering={false}
      >
        <Boundary
          labels={["Counter Context Provider [Client Component]"]}
          color="blue"
          size="small"
          animateRerendering={false}
        >
          <CounterProvider>
            <Boundary
              labels={["Server Component Boundary"]}
              size="small"
              animateRerendering={false}
            >
              <div className="space-y-9">
                <div className="flex justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {tabs.map((tab) => (
                      <TabWrapper
                        key={path + tab.slug}
                        item={tab}
                        path={path}
                      />
                    ))}
                  </div>
                </div>

                <ContextClickCounter />
                <div>{children}</div>
              </div>
            </Boundary>
          </CounterProvider>
        </Boundary>
      </Boundary>
    </div>
  )
}
